// Hanzo Space — Branding Configuration

import { ApplicationLogoProps } from "mds";

const MinIOPlan =
  (
    document.head.querySelector(
      "[name~=minio-license][content]",
    ) as HTMLMetaElement
  )?.content || "AGPL";

type LogoVar =
  | "AGPL"
  | "simple"
  | "standard"
  | "enterprise"
  | "new"
  | "enterpriseos"
  | "enterpriseosvertical"
  | undefined;

export const getLogoVar = (): LogoVar => {
  // Always return simple variant for Hanzo branding
  return "simple";
};

export const getLogoApplicationVariant =
  (): ApplicationLogoProps["applicationName"] => {
    return "console";
  };
