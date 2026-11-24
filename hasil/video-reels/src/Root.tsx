import { Composition } from "remotion";
import { Reels } from "./Composition";
import { FPS, TOTAL } from "./content";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="MakmurkanMasjidReels"
      component={Reels}
      durationInFrames={TOTAL}
      fps={FPS}
      width={1080}
      height={1920}
    />
  );
};
