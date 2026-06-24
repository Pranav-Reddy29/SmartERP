import { Response } from "express";

import prisma from "../config/prisma";
import { AuthRequest } from "../middlewares/auth.middleware";

export const createCompany = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const {
      companyName,
      gstNumber,
      state,
      address,
      phone,
      financialYear
    } = req.body;

    const companyCount = await prisma.company.count({
      where: {
        userId: req.userId
      }
    });

    if (companyCount >= 5) {
      return res.status(400).json({
        success: false,
        message: "Maximum 5 companies allowed"
      });
    }

    const company = await prisma.company.create({
      data: {
        companyName,
        gstNumber,
        state,
        address,
        phone,
        financialYear,
        userId: req.userId!
      }
    });

    return res.status(201).json({
      success: true,
      company
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

export const getCompanies = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const companies = await prisma.company.findMany({
      where: {
        userId: req.userId
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return res.status(200).json({
      success: true,
      companies
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

export const getCompany = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const companyId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    if (!companyId) {
      return res.status(400).json({
        success: false,
        message: "Invalid company id"
      });
    }

    const company = await prisma.company.findFirst({
      where: {
        id: companyId,
        userId: req.userId
      }
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found"
      });
    }

    return res.status(200).json({
      success: true,
      company
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

export const updateCompany = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const companyId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    if (!companyId) {
      return res.status(400).json({
        success: false,
        message: "Invalid company id"
      });
    }

    const company = await prisma.company.findFirst({
      where: {
        id: companyId,
        userId: req.userId
      }
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found"
      });
    }

    const updatedCompany = await prisma.company.update({
      where: {
        id: companyId
      },
      data: req.body
    });

    return res.status(200).json({
      success: true,
      company: updatedCompany
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

export const deleteCompany = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const companyId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    if (!companyId) {
      return res.status(400).json({
        success: false,
        message: "Invalid company id"
      });
    }

    const company = await prisma.company.findFirst({
      where: {
        id: companyId,
        userId: req.userId
      }
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found"
      });
    }

    await prisma.company.delete({
      where: {
        id: companyId
      }
    });

    return res.status(200).json({
      success: true,
      message: "Company deleted successfully"
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};