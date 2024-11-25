import { PinataSDK } from "pinata";

const pinataJwt = import.meta.env.VITE_PINATA_JWT;
const pinataGateway = import.meta.env.VITE_PINATA_GATEWAY;

export const pinata = new PinataSDK({
  pinataJwt,
  pinataGateway,
});
