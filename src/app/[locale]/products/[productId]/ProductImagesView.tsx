"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ImageCarousel } from "@/components/common/ImageCarousel";
import { XIcon } from "@/components/icons/XIcon";
import { Button, ButtonGroup, IconButton } from "@mui/material";
import Image from "next/image";

interface Props {
  images: string[];
  open: boolean;
  onClose: () => void;
}

const ZOOM_SCALE_STEP = 1.3;

export function ProductImagesView(props: Props) {
  const [active, setActive] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);

  // drag-to-pan state
  const dragRef = useRef<{
    isDown: boolean;
    startX: number;
    startY: number;
    scrollLeft: number;
    scrollTop: number;
    el: HTMLDivElement | null;
  }>({
    isDown: false,
    startX: 0,
    startY: 0,
    scrollLeft: 0,
    scrollTop: 0,
    el: null,
  });

  // Refs for each image scroll container
  const containerRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Ensure we reset zoom on open/close transitions
  useEffect(() => {
    if (props.open) {
      setZoom(1);
    }
  }, [props.open]);

  // Reset zoom on image change
  useEffect(() => {
    setZoom(1);
  }, [active]);

  useLayoutEffect(() => {
    if (!props.open || !viewportRef.current) {
      return;
    }
    const scrollWidth = viewportRef.current.scrollWidth;
    viewportRef.current.scrollTo({
      behavior: "smooth",
      left: (active * scrollWidth) / props.images.length,
    });
  }, [active, props.open, props.images.length]);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (zoom <= 1) return;
    dragRef.current.isDown = true;
    dragRef.current.el = e.currentTarget;
    dragRef.current.startX = e.clientX;
    dragRef.current.startY = e.clientY;
    dragRef.current.scrollLeft = e.currentTarget.scrollLeft;
    dragRef.current.scrollTop = e.currentTarget.scrollTop;
    e.currentTarget.style.cursor = "grabbing";
    e.preventDefault();
  };
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragRef.current.isDown || !dragRef.current.el) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    dragRef.current.el.scrollLeft = dragRef.current.scrollLeft - dx;
    dragRef.current.el.scrollTop = dragRef.current.scrollTop - dy;
  };
  const endDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragRef.current.el) {
      dragRef.current.el.style.cursor = zoom > 1 ? "grab" : "auto";
    }
    dragRef.current.isDown = false;
    dragRef.current.el = null;
  };

  // Zoom keeping viewport center
  const zoomTo = (nextZoom: number) => {
    const prevZoom = zoom;
    const el = containerRefs.current[active];
    if (!el) {
      setZoom(nextZoom);
      return;
    }
    const ratio = nextZoom / prevZoom;
    const centerX = el.scrollLeft + el.clientWidth / 2;
    const centerY = el.scrollTop + el.clientHeight / 2;
    setZoom(nextZoom);
    requestAnimationFrame(() => {
      el.scrollLeft = centerX * ratio - el.clientWidth / 2;
      el.scrollTop = centerY * ratio - el.clientHeight / 2;
    });
  };

  const handleZoomIn = () => {
    zoomTo(zoom * ZOOM_SCALE_STEP);
  };
  const handleZoomOut = () => {
    const next = Math.max(1, zoom / ZOOM_SCALE_STEP);
    zoomTo(next);
  };

  const handleClose = () => {
    setZoom(1);
    props.onClose();
  };

  if (!props.open) {
    return null;
  }

  return (
    <div
      ref={viewportRef}
      className={"fixed flex z-1201 bg-black"}
      style={{
        width: `100vw`,
        height: "100vh",
        top: 0,
        overflow: "hidden",
      }}
    >
      <div
        className={
          "fixed top-4 md:top-[60px] z-1 bg-white right-4 md:right-[80px] rounded-full"
        }
      >
        <IconButton
          sx={{
            padding: { xs: "10px", md: "12px" },
            minWidth: { xs: "44px", md: "auto" },
            minHeight: { xs: "44px", md: "auto" },
          }}
          onClick={handleClose}
          className={"touch-manipulation"}
        >
          <XIcon strokeWidth={1} size={3} />
        </IconButton>
      </div>
      <div
        className={"flex"}
        style={{
          width: `${100 * props.images.length}%`,
          height: "100%",
          position: "relative",
        }}
      >
        {props.images.map((image, index) => {
          return (
            <div
              key={index}
              // @ts-expect-error
              ref={(el) => (containerRefs.current[index] = el)}
              className={
                "w-screen h-full overflow-auto px-2 md:px-9 viewImageContainer"
              }
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={endDrag}
              onMouseLeave={endDrag}
              style={{
                cursor: zoom > 1 ? "grab" : "auto",
                paddingLeft: zoom > 1 ? 0 : undefined,
                paddingRight: zoom > 1 ? 0 : undefined,
              }}
            >
              <div
                className={"w-full h-full relative viewImageContainer"}
                style={{
                  width: `${zoom * 100}%`,
                  height: `${zoom * 100}%`,
                }}
              >
                <Image
                  src={image}
                  fill
                  draggable={false}
                  style={{
                    objectFit: "contain",
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                  alt={"Image"}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className={"fixed bottom-4 md:bottom-[64px] left-4 md:left-[80px]"}>
        <div className={"pb-3 md:pb-4"}>
          <ButtonGroup
            orientation={"vertical"}
            variant={"outlined"}
            color={"primary"}
            sx={{
              background: "white",
              borderRadius: { xs: "24px 24px", md: "30px 30px" },
              border: "none",
            }}
          >
            <Button
              sx={{
                fontSize: { xs: "18px", md: "22px" },
                border: "none",
                minWidth: { xs: "44px", md: "auto" },
                minHeight: { xs: "44px", md: "auto" },
                padding: { xs: "8px", md: "auto" },
              }}
              onClick={handleZoomIn}
              className={"touch-manipulation"}
            >
              +
            </Button>
            <Button
              sx={{
                fontSize: { xs: "18px", md: "22px" },
                border: "none",
                minWidth: { xs: "44px", md: "auto" },
                minHeight: { xs: "44px", md: "auto" },
                padding: { xs: "8px", md: "auto" },
              }}
              onClick={handleZoomOut}
              className={"touch-manipulation"}
            >
              -
            </Button>
          </ButtonGroup>
        </div>
        <ImageCarousel
          images={props.images}
          activeIndex={active}
          onChange={setActive}
        />
      </div>
    </div>
  );
}
