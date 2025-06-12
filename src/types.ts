import React from "react";

export type Transaction = {
  id: number;
  senderName: string;
  receiverName: string;
  amount: number;
  city: string;
  department: string;
  date: string;
}

export type Column<
  ItemType extends { id: number }, 
  Key extends keyof ItemType = keyof ItemType
> = {
  key: Key;
  header: string;
  width?: number;
  render?: (value: ItemType[Key], row?: ItemType) => React.ReactNode;
};