export interface GridItem {
  colSpan: string;
  rowSpan: string;
  aspectRatio: string;
  priority?: boolean;
}

export interface GridLayout {
  items: GridItem[];
  gridClass: string;
}

// Generate dynamic bento grid layouts based on image count
export function generateGridLayout(imageCount: number): GridLayout {
  switch (imageCount) {
    case 1:
      return {
        gridClass: "grid-cols-1",
        items: [
          {
            colSpan: "col-span-1",
            rowSpan: "row-span-1",
            aspectRatio: "aspect-[4/3]",
            priority: true
          }
        ]
      };

    case 2:
      return {
        gridClass: "grid-cols-1 md:grid-cols-2",
        items: [
          {
            colSpan: "col-span-1",
            rowSpan: "row-span-1",
            aspectRatio: "aspect-[4/3]",
            priority: true
          },
          {
            colSpan: "col-span-1",
            rowSpan: "row-span-1",
            aspectRatio: "aspect-[4/3]",
            priority: true
          }
        ]
      };

    case 3:
      return {
        gridClass: "grid-cols-1 md:grid-cols-3",
        items: [
          {
            colSpan: "col-span-1 md:col-span-2",
            rowSpan: "row-span-1",
            aspectRatio: "aspect-[4/3]",
            priority: true
          },
          {
            colSpan: "col-span-1",
            rowSpan: "row-span-1",
            aspectRatio: "aspect-square"
          },
          {
            colSpan: "col-span-1 md:col-span-3",
            rowSpan: "row-span-1",
            aspectRatio: "aspect-[16/9]"
          }
        ]
      };

    case 4:
      return {
        gridClass: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
        items: [
          {
            colSpan: "col-span-1 md:col-span-2",
            rowSpan: "row-span-1",
            aspectRatio: "aspect-[4/3]",
            priority: true
          },
          {
            colSpan: "col-span-1",
            rowSpan: "row-span-1",
            aspectRatio: "aspect-square"
          },
          {
            colSpan: "col-span-1",
            rowSpan: "row-span-1",
            aspectRatio: "aspect-square"
          },
          {
            colSpan: "col-span-1 md:col-span-2",
            rowSpan: "row-span-1",
            aspectRatio: "aspect-[4/3]"
          }
        ]
      };

    case 5:
      return {
        gridClass: "grid-cols-1 md:grid-cols-3 lg:grid-cols-5",
        items: [
          {
            colSpan: "col-span-1 md:col-span-2",
            rowSpan: "row-span-1",
            aspectRatio: "aspect-[4/3]",
            priority: true
          },
          {
            colSpan: "col-span-1",
            rowSpan: "row-span-1",
            aspectRatio: "aspect-square"
          },
          {
            colSpan: "col-span-1",
            rowSpan: "row-span-1",
            aspectRatio: "aspect-square"
          },
          {
            colSpan: "col-span-1",
            rowSpan: "row-span-1",
            aspectRatio: "aspect-square"
          },
          {
            colSpan: "col-span-1 md:col-span-3 lg:col-span-5",
            rowSpan: "row-span-1",
            aspectRatio: "aspect-[16/9]"
          }
        ]
      };

    case 6:
      return {
        gridClass: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        items: [
          {
            colSpan: "col-span-1 md:col-span-2 lg:col-span-2",
            rowSpan: "row-span-1",
            aspectRatio: "aspect-[4/3]",
            priority: true
          },
          {
            colSpan: "col-span-1",
            rowSpan: "row-span-1",
            aspectRatio: "aspect-square"
          },
          {
            colSpan: "col-span-1",
            rowSpan: "row-span-1",
            aspectRatio: "aspect-square"
          },
          {
            colSpan: "col-span-1",
            rowSpan: "row-span-1",
            aspectRatio: "aspect-square"
          },
          {
            colSpan: "col-span-1",
            rowSpan: "row-span-1",
            aspectRatio: "aspect-square"
          },
          {
            colSpan: "col-span-1 md:col-span-2 lg:col-span-3",
            rowSpan: "row-span-1",
            aspectRatio: "aspect-[16/9]"
          }
        ]
      };

    case 7:
      return {
        gridClass: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
        items: [
          {
            colSpan: "col-span-1 md:col-span-2 lg:col-span-2",
            rowSpan: "row-span-1",
            aspectRatio: "aspect-[4/3]",
            priority: true
          },
          {
            colSpan: "col-span-1",
            rowSpan: "row-span-1",
            aspectRatio: "aspect-square"
          },
          {
            colSpan: "col-span-1",
            rowSpan: "row-span-1",
            aspectRatio: "aspect-square"
          },
          {
            colSpan: "col-span-1",
            rowSpan: "row-span-1",
            aspectRatio: "aspect-square"
          },
          {
            colSpan: "col-span-1",
            rowSpan: "row-span-1",
            aspectRatio: "aspect-square"
          },
          {
            colSpan: "col-span-1",
            rowSpan: "row-span-1",
            aspectRatio: "aspect-square"
          },
          {
            colSpan: "col-span-1 md:col-span-2 lg:col-span-4",
            rowSpan: "row-span-1",
            aspectRatio: "aspect-[16/9]"
          }
        ]
      };

    case 8:
      return {
        gridClass: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
        items: [
          {
            colSpan: "col-span-1 md:col-span-2 lg:col-span-2",
            rowSpan: "row-span-1",
            aspectRatio: "aspect-[4/3]",
            priority: true
          },
          {
            colSpan: "col-span-1",
            rowSpan: "row-span-1",
            aspectRatio: "aspect-square"
          },
          {
            colSpan: "col-span-1",
            rowSpan: "row-span-1",
            aspectRatio: "aspect-square"
          },
          {
            colSpan: "col-span-1",
            rowSpan: "row-span-1",
            aspectRatio: "aspect-square"
          },
          {
            colSpan: "col-span-1",
            rowSpan: "row-span-1",
            aspectRatio: "aspect-square"
          },
          {
            colSpan: "col-span-1",
            rowSpan: "row-span-1",
            aspectRatio: "aspect-square"
          },
          {
            colSpan: "col-span-1",
            rowSpan: "row-span-1",
            aspectRatio: "aspect-square"
          },
          {
            colSpan: "col-span-1 md:col-span-2 lg:col-span-4",
            rowSpan: "row-span-1",
            aspectRatio: "aspect-[16/9]"
          }
        ]
      };

    case 9:
      return {
        gridClass: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        items: [
          {
            colSpan: "col-span-1 md:col-span-2 lg:col-span-2",
            rowSpan: "row-span-1",
            aspectRatio: "aspect-[4/3]",
            priority: true
          },
          {
            colSpan: "col-span-1",
            rowSpan: "row-span-1",
            aspectRatio: "aspect-square"
          },
          {
            colSpan: "col-span-1",
            rowSpan: "row-span-1",
            aspectRatio: "aspect-square"
          },
          {
            colSpan: "col-span-1",
            rowSpan: "row-span-1",
            aspectRatio: "aspect-square"
          },
          {
            colSpan: "col-span-1",
            rowSpan: "row-span-1",
            aspectRatio: "aspect-square"
          },
          {
            colSpan: "col-span-1",
            rowSpan: "row-span-1",
            aspectRatio: "aspect-square"
          },
          {
            colSpan: "col-span-1",
            rowSpan: "row-span-1",
            aspectRatio: "aspect-square"
          },
          {
            colSpan: "col-span-1",
            rowSpan: "row-span-1",
            aspectRatio: "aspect-square"
          },
          {
            colSpan: "col-span-1 md:col-span-2 lg:col-span-3",
            rowSpan: "row-span-1",
            aspectRatio: "aspect-[16/9]"
          }
        ]
      };

    case 10:
      return {
        gridClass: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
        items: [
          {
            colSpan: "col-span-1 md:col-span-2 lg:col-span-2",
            rowSpan: "row-span-1",
            aspectRatio: "aspect-[4/3]",
            priority: true
          },
          {
            colSpan: "col-span-1",
            rowSpan: "row-span-1",
            aspectRatio: "aspect-square"
          },
          {
            colSpan: "col-span-1",
            rowSpan: "row-span-1",
            aspectRatio: "aspect-square"
          },
          {
            colSpan: "col-span-1",
            rowSpan: "row-span-1",
            aspectRatio: "aspect-square"
          },
          {
            colSpan: "col-span-1",
            rowSpan: "row-span-1",
            aspectRatio: "aspect-square"
          },
          {
            colSpan: "col-span-1",
            rowSpan: "row-span-1",
            aspectRatio: "aspect-square"
          },
          {
            colSpan: "col-span-1",
            rowSpan: "row-span-1",
            aspectRatio: "aspect-square"
          },
          {
            colSpan: "col-span-1",
            rowSpan: "row-span-1",
            aspectRatio: "aspect-square"
          },
          {
            colSpan: "col-span-1",
            rowSpan: "row-span-1",
            aspectRatio: "aspect-square"
          },
          {
            colSpan: "col-span-1 md:col-span-2 lg:col-span-4",
            rowSpan: "row-span-1",
            aspectRatio: "aspect-[16/9]"
          }
        ]
      };

    default:
      // For 11+ images, use a masonry-style grid
      return {
        gridClass: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        items: Array.from({ length: imageCount }, (_, index) => ({
          colSpan: "col-span-1",
          rowSpan: "row-span-1",
          aspectRatio: index < 3 ? "aspect-[4/3]" : "aspect-square",
          priority: index < 3
        }))
      };
  }
}

// Get all images for a specific day
export function getDayImages(dayId: string): string[] {
  const images: string[] = [];

  // Add numbered images based on actual file ranges
  if (dayId === 'corporate') {
    // Corporate: files 6-10
    for (let i = 6; i <= 10; i++) {
      images.push(`/corporate/corporate_${i}.jpeg`);
    }
    // Add group photos
    images.push('/corporate/corporate_group_photo_1.jpeg');
    images.push('/corporate/corporate_group_photo_2.jpeg');
    images.push('/corporate/corporate_group_photo_3.jpeg');
    images.push('/corporate/corporate_group_photo_4.jpeg');
    images.push('/corporate/corporate_portrait_1.jpeg');
  } else if (dayId === 'denim') {
    // Denim: file 3 only
    images.push('/denim/denim_3.jpeg');
    // Add group photos
    images.push('/denim/denim_group_photo_1.jpeg');
    images.push('/denim/denim_group_photo_2.jpeg');
  } else if (dayId === 'jersey') {
    // Jersey: files 2-5
    for (let i = 2; i <= 5; i++) {
      images.push(`/jersey/jersey_${i}.jpeg`);
    }
    // Add group photo
    images.push('/jersey/jersey_group_photo_1.jpeg');
  } else if (dayId === 'costume') {
    // Costume: no numbered files, only group photo
    images.push('/costume/costume_group_photo_1.jpeg');
  } else if (dayId === 'owambe') {
    // Owambe: files 2-7
    for (let i = 2; i <= 7; i++) {
      images.push(`/owambe/owambe_${i}.jpeg`);
    }
    // Add group photo
    images.push('/owambe/owambe_group_photo_1.jpeg');
  } else if (dayId === 'others') {
    // Others: files 1-4
    for (let i = 1; i <= 4; i++) {
      images.push(`/others/others_${i}.jpeg`);
    }
  }

  return images;
}

// Debug function to log image paths
export function debugImagePaths(dayId: string): void {
  const images = getDayImages(dayId);
  console.log(`Images for ${dayId}:`, images);
  console.log(`Total images for ${dayId}:`, images.length);
}
