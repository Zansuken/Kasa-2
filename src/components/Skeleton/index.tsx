import { FC } from "react";
import styled, { keyframes } from "styled-components";
import { StyledProps } from "../../styles/theme";

const loadingAnimation = keyframes`
    0% {
        background-color: rgba(0, 0, 0, 0.1);
    }
    50% {
        background-color: rgba(0, 0, 0, 0.3);
    }
    100% {
        background-color: rgba(0, 0, 0, 0.1);
    }
    `;

const TextSkeleton = styled.div<
  StyledProps & { $height: number; $width: number }
>`
  width: ${({ $width }) => ($width ? `${($width * 100) / 12}%` : "100%")};
  height: ${({ $height }) => ($height ? $height : 16)}px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: ${({ theme: { spacing } }) => spacing(1)}px;
  animation: ${loadingAnimation} 1s infinite;
`;

const AvatarSkeleton = styled.div<StyledProps & { $height: number }>`
  width: ${({ $height }) => $height}px;
  height: ${({ $height }) => $height}px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  animation: ${loadingAnimation} 1s infinite;
`;

const ImageSkeleton = styled.div<
  StyledProps & { $height: number; $width: number; $borderRadius: number }
>`
  width: ${({ $width }) => `${($width * 100) / 12}%`};
  height: ${({ $height }) => $height}px;
  background-color: rgba(0, 0, 0, 0.1);
  animation: ${loadingAnimation} 1s infinite;
  border-radius: ${({ $borderRadius }) => $borderRadius};
`;

type Props = {
  /**
   * @default "text"
   */
  variant: "text" | "avatar" | "image";
  height?: number;
  /**
   * Width of the skeleton
   *
   * `Not used for avatar variant`
   *
   * ## For text and image:
   * ### Based on 12 columns grid
   * - 12 - 100%
   * - 9 - 75%
   * - 6 - 50%
   * - 3 - 25%
   * ## For avatar:
   * In pixels
   */
  width?: number;
  /**
   * Only for image variant
   */
  borderRadius?: number;
};

const Skeleton: FC<Props> = ({
  variant,
  height = 16,
  width = 12,
  borderRadius = 0,
}) => {
  if (variant === "avatar") {
    return <AvatarSkeleton $height={height} />;
  }

  if (variant === "image") {
    return (
      <ImageSkeleton
        $height={height}
        $width={width}
        $borderRadius={borderRadius}
      />
    );
  }

  return <TextSkeleton $height={height} $width={width} />;
};

export default Skeleton;
