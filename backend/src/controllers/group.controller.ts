import { Request, Response } from "express";

import * as groupService from "../services/group.service";

import { validateGroup } from "../validations/group.validation";

export const createGroup = async (
  req: Request,
  res: Response
) => {
  try {
    const error = validateGroup(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error,
      });
    }

    const group =
      await groupService.createGroup(req.body);

    return res.status(201).json({
      success: true,
      group,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getGroups = async (
  req: Request,
  res: Response
) => {
  try {
    const { companyId, search } = req.query;

    const groups =
      await groupService.getGroups(
        companyId as string,
        search as string
      );

    return res.json({
      success: true,
      groups,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getGroup = async (
  req: Request,
  res: Response
) => {
  try {
    const group =
      await groupService.getGroupById(
        req.params.id
      );

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }

    return res.json({
      success: true,
      group,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const updateGroup = async (
  req: Request,
  res: Response
) => {
  try {
    const group =
      await groupService.updateGroup(
        req.params.id,
        req.body
      );

    return res.json({
      success: true,
      group,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const deleteGroup = async (
  req: Request,
  res: Response
) => {
  try {
    await groupService.deleteGroup(
      req.params.id
    );

    return res.json({
      success: true,
      message: "Group deleted successfully",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};