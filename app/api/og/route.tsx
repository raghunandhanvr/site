import { ImageResponse } from "next/og";
import { siteConfig } from "@/app/config";

export const runtime = 'edge';

function generatePixelArt() {
  const grid = Array(6).fill(0).map(() => 
    Array(6).fill(0).map(() => Math.random() > 0.5)
  );
  
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 3; j++) {
      grid[i][5-j] = grid[i][j];
    }
  }
  
  return grid;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const title = url.searchParams.get("title") || siteConfig.name;
  
  const pixelArt = generatePixelArt();
  const pixelSize = 8;
  const gridSize = 6;
  const totalSize = pixelSize * gridSize;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: 'white',
          padding: '64px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '32px',
          }}
        >
          <svg
            width={totalSize}
            height={totalSize}
            viewBox={`0 0 ${totalSize} ${totalSize}`}
            style={{ display: 'block' }}
          >
            {pixelArt.map((row, i) =>
              row.map((pixel, j) => pixel && (
                <rect
                  key={`${i}-${j}`}
                  x={j * pixelSize}
                  y={i * pixelSize}
                  width={pixelSize}
                  height={pixelSize}
                  fill="black"
                />
              ))
            )}
          </svg>
          <div
            style={{
              display: 'flex',
              fontSize: 48,
              fontWeight: 'bold',
              letterSpacing: '-0.025em',
              color: 'black',
              textAlign: 'left',
              maxWidth: '80%',
            }}
          >
            {title}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

