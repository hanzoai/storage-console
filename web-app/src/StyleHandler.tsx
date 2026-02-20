// This file is part of Hanzo Space
// Copyright (c) 2021 Hanzo AI, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import React, { Fragment } from "react";
import { GlobalStyles, ThemeHandler } from "mds";
import "react-virtualized/styles.css";

import { generateOverrideTheme } from "./utils/stylesUtils";
import "./index.css";
import { useSelector } from "react-redux";
import { AppState } from "./store";

interface IStyleHandler {
  children: React.ReactNode;
}

// Hanzo dark theme for landing page - subtle rgba borders instead of harsh grays
const HANZO_DARK_THEME = {
  bgColor: "#09090b",
  fontColor: "#fafafa",
  borderColor: "rgba(255,255,255,0.06)",
  bulletColor: "#fafafa",
  logoColor: "#fd4444",
  logoLabelColor: "#fafafa",
  logoLabelInverse: "#fff",
  logoContrast: "#000",
  logoContrastInverse: "#fafafa",
  loaderColor: "#fd4444",
  boxBackground: "#111113",
  mutedText: "#a1a1aa",
  secondaryText: "#a1a1aa",
  linkColor: "#fd4444",
};

const StyleHandler = ({ children }: IStyleHandler) => {
  const colorVariants = useSelector(
    (state: AppState) => state.system.overrideStyles,
  );
  const darkMode = useSelector((state: AppState) => state.system.darkMode);

  let thm = undefined;

  if (colorVariants) {
    thm = generateOverrideTheme(colorVariants);
  } else if (!colorVariants) {
    // Use Hanzo dark theme by default for landing page
    thm = HANZO_DARK_THEME;
  }

  return (
    <Fragment>
      <GlobalStyles />
      <ThemeHandler darkMode={darkMode} customTheme={thm}>
        {children}
      </ThemeHandler>
    </Fragment>
  );
};

export default StyleHandler;
