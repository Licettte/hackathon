import { FC, CSSProperties, HTMLAttributes } from "react";
import clsx from "clsx";

type FlexProps = {
  dir?: CSSProperties["flexDirection"];
  wrap?: CSSProperties["flexWrap"];
  justify?: CSSProperties["justifyContent"];
  align?: CSSProperties["alignItems"];
  content?: CSSProperties["alignContent"];
  gap?: number | string;
  style?: CSSProperties;
  className?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, "className" | "style">;

export const Flex: FC<FlexProps> = ({
  dir = "row",
  wrap,
  justify,
  align,
  content,
  gap,
  style,
  className,
  children,
  ...rest
}) => (
  <div
    className={clsx( className)}
    style={{
      display: "flex",
      flexDirection: dir,
      flexWrap: wrap,
      justifyContent: justify,
      alignItems: align,
      alignContent: content,
      gap: typeof gap === "number" ? `${gap}px` : gap,
      ...style,
    }}
    {...rest}
  >
    {children}
  </div>
);
