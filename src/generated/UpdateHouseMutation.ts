/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { HouseInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateHouseMutation
// ====================================================

export interface UpdateHouseMutation_updateHouse {
  __typename: "House";
  id: string;
  image: string;
  publicId: string;
  address: string;
  bedrooms: number;
  latitude: number;
  longitude: number;
}

export interface UpdateHouseMutation {
  updateHouse: UpdateHouseMutation_updateHouse | null;
}

export interface UpdateHouseMutationVariables {
  id: string;
  input: HouseInput;
}
