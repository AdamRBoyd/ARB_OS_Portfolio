import styled from "styled-components";

import {
    Stack,
    InsetSurface,
    InsetWindowShell,
    Title,
    Subtitle,
} from '@primitives';

const PickerShell = styled(InsetWindowShell)`
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 0.25rem;
  min-height: 0;
  height: 100%;
  overflow: hidden;
`;

const TitleColumn = styled(Stack)`
  margin: 0.2rem 1rem 0.5rem;
  flex-shrink: 0;
`;

const WallpaperGrid = styled(InsetSurface)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  width: 100%;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;

  padding: 1rem;
  gap: 1rem;
  border: none;
  box-sizing: border-box;

  scrollbar-width: thin;
    scrollbar-color: ${({ theme }) => theme.palette.grays[6]} transparent;

  &::-webkit-scrollbar {
        width: 8px;
    }
    &::-webkit-scrollbar-track {
        background: transparent;
    }
    &::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.palette.grays[6]};
        border-radius: 999px;
    }
    &::-webkit-scrollbar-thumb:hover {
        background: ${({ theme }) => theme.palette.grays[7]};
    }
`;

const WallpaperCard = styled.button`
  all: unset;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  padding: 0.6rem;
  border-radius: 12px;
  background: ${({ theme, $selected }) =>
        $selected ? theme.palette.grays[5] : theme.palette.grays[3]};

  transition: transform 120ms ease, background 120ms ease;

  &:hover {
    transform: translateY(-2px);
    background: ${({ theme }) => theme.palette.light[2]};
  }
`;

const WallpaperThumb = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 10px;
  overflow: hidden;
  background: ${({ theme }) => theme.palette.grays[1]};
  border: ${({ theme }) => theme.palette.light[4]} 1px solid;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const WallpaperName = styled.div`
  font-size: 0.9rem;
  line-height: 1.2;
  color: ${({ theme }) => theme.palette.tertiary[0]};
`;

const WallpaperPickerWindow = ({
    wallpapers,
    selectedWallpaperId,
    onSelectWallpaper,
}) => {
    return (
        <PickerShell>
            <TitleColumn>
                <Title>Choose Wallpaper</Title>
                <Subtitle>
                    Select a wallpaper to set as your desktop background.
                </Subtitle>
            </TitleColumn>

            <WallpaperGrid>
                {wallpapers.map((wallpaper) => (
                    <WallpaperCard
                        key={wallpaper.id}
                        $selected={wallpaper.id === selectedWallpaperId}
                        onClick={() => onSelectWallpaper(wallpaper.id)}
                    >
                        <WallpaperThumb>
                            <img src={`/images/wallpapers/thumbs/${wallpaper.src}`} alt={wallpaper.title} />
                        </WallpaperThumb>

                        <WallpaperName>{wallpaper.title}</WallpaperName>
                    </WallpaperCard>
                ))}
            </WallpaperGrid>
        </PickerShell>
    );
};

export default WallpaperPickerWindow;