import { PinataSDK } from "pinata";

const pinataJwt = import.meta.env.VITE_PINATA_JWT;
const pinataGateway = import.meta.env.VITE_PINATA_GATEWAY;

// const pinataJwt =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2MzAyODFiNC1jYzNhLTQ4NDUtYmU5Zi00MmQyMGM1ZTIyNDQiLCJlbWFpbCI6ImFzaXdhanVhemVlemFiaWRveWVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjJjZjVkMzU3ZGM1NmM2NWQ2ZDNlIiwic2NvcGVkS2V5U2VjcmV0IjoiNjI5MTk2YTQwZWFlNzE1NWY1YzJkOGZmMWVhNDFkOTg0MmMzYTYzMDQ4ODYxZGE2ZTkxODUzN2ExZmY0NWYyOSIsImV4cCI6MTc2Mzc4Mjc0M30.b5HXzqmxDGok9jjifHQO8bd8DXUou9-NPyjTv6pgq94";
// const pinataGateway = "gray-written-llama-297.mypinata.cloud";
export const pinata = new PinataSDK({
  pinataJwt: pinataJwt,
  pinataGateway: pinataGateway,
});
