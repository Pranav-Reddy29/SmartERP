# SmartERP Database Schema

## Tables

1. users
2. companies
3. groups
4. ledgers
5. units
6. stock_groups
7. stock_items
8. purchase_vouchers
9. purchase_items
10. sales_vouchers
11. sales_items
12. inventory_transactions

## Relationships

User -> Companies

Company ->
- Groups
- Ledgers
- Units
- Stock Groups
- Stock Items
- Purchase Vouchers
- Sales Vouchers

Purchase Voucher -> Purchase Items

Sales Voucher -> Sales Items

Stock Item -> Inventory Transactions