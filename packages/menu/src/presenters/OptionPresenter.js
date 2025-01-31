import React from "react";
import PropTypes from "prop-types";
import { css, cx } from "emotion";
import { ThemeContext } from "@hig/theme-context";
import { CheckmarkSUI, CheckmarkXsUI } from "@hig/icons";
import { createCustomClassNames } from "@hig/utils";

import stylesheet from "./stylesheet";
import { AVAILABLE_ROLES } from "../constants";

const OptionPresenter = props => {
  const {
    asset,
    checkmark,
    children,
    optionRef,
    disabled,
    highlighted,
    id,
    isPressed,
    role,
    selected,
    shortcut,
    stylesheet: customStylesheet,
    unselect,
    ...otherProps
  } = props;
  const { className } = otherProps;
  const menuOptionClassName = createCustomClassNames(className, `menu-option`);
  const checkmarkWrapperClassName = createCustomClassNames(
    className,
    `checkmark-wrapper`
  );
  const assetWrapperClassName = createCustomClassNames(
    className,
    `asset-wrapper`
  );
  const optionContentWrapperClassName = createCustomClassNames(
    className,
    `option-content-wrapper`
  );
  const shortcutWrapperClassName = createCustomClassNames(
    className,
    `shortcut-wrapper`
  );
  const payload = { ...otherProps };
  delete payload.getActiveOption;
  delete payload.getHighlightIndex;
  delete payload.getOptionsInfo;
  delete payload.getPreviousEvent;
  delete payload.setActiveOption;
  delete payload.setHighlightIndex;

  const ariaPayload = role === `option` ? { "aria-selected": selected } : {};

  return (
    <ThemeContext.Consumer>
      {({ resolvedRoles, metadata }) => {
        const styles = stylesheet(
          {
            disabled,
            highlighted,
            isPressed,
            role,
            selected,
            shortcut,
            stylesheet: customStylesheet,
            unselect
          },
          resolvedRoles
        );
        const Checkmark =
          metadata.densityId === `medium-density`
            ? CheckmarkSUI
            : CheckmarkXsUI;
        return (
          <li
            // conditional payload for aria-selected
            {...ariaPayload}
            {...payload}
            className={cx([menuOptionClassName, css(styles.menuOption)])}
            disabled={disabled}
            id={id}
            ref={optionRef}
            role={role}
            selected={selected}
          >
            {checkmark && role !== `presentation` ? (
              <div
                className={cx([
                  checkmarkWrapperClassName,
                  css(styles.checkmarkWrapper)
                ])}
              >
                <Checkmark />
              </div>
            ) : null}
            {asset ? (
              <div
                className={cx([
                  assetWrapperClassName,
                  css(styles.assetWrapper)
                ])}
              >
                {asset}
              </div>
            ) : null}
            <div
              className={cx([
                optionContentWrapperClassName,
                css(styles.optionContentWrapper)
              ])}
            >
              {children}
              {shortcut ? (
                <span
                  className={cx([
                    shortcutWrapperClassName,
                    css(styles.shortcutWrapper)
                  ])}
                >
                  {shortcut}
                </span>
              ) : null}
            </div>
          </li>
        );
      }}
    </ThemeContext.Consumer>
  );
};

OptionPresenter.displayName = "OptionPresenter";

OptionPresenter.propTypes = {
  asset: PropTypes.node,
  checkmark: PropTypes.bool,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  highlighted: PropTypes.bool,
  id: PropTypes.string,
  isPressed: PropTypes.bool,
  optionRef: PropTypes.func,
  role: PropTypes.oneOf(AVAILABLE_ROLES),
  selected: PropTypes.bool,
  shortcut: PropTypes.node,
  stylesheet: PropTypes.func,
  unselect: PropTypes.bool
};

export default OptionPresenter;
