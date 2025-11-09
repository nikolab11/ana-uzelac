import { Button, IconButton } from "@mui/material";
import { ChevronLeft } from "@/components/icons/ChevronLeft";

interface Props {
  label?: string;
  onClick: () => void;
  initialExpanded?: boolean;
}

export function BackButton(props: Props) {
  const expanded = !!props.initialExpanded;
  return (
    <div
      className={
        "absolute top-[20px] left-4 md:relative md:top-0 md:left-0 z-1400 group"
      }
    >
      {props.label ? (
        <div className="relative inline-flex items-center overflow-hidden">
          <Button
            size={"small"}
            color={"primary"}
            variant={"contained"}
            onClick={props.onClick}
            sx={{
              background: "#FCF7F1",
              boxShadow: "none",
              fontSize: { xs: "10px", md: "12px" },
              color: "var(--foreground)",
              fontWeight: "500",
              padding: { xs: "5px 6px", md: "6px 8px" },
              lineHeight: { xs: "10px", md: "12px" },
              borderRadius: "32px",
              width: "auto",
              overflow: "hidden",
              whiteSpace: "nowrap",
              maxWidth: expanded ? "600px" : "56px",
              minWidth: "32px",
              transition: "max-width 0.3s ease",
              "& .MuiButton-startIcon": {
                marginRight: expanded ? "6px" : 0,
              },
              "& .button-label": {
                display: expanded ? "inline" : "none",
              },
              "&:hover": {
                boxShadow: "none",
                maxWidth: "600px",
              },
              "&:hover .MuiButton-startIcon": {
                marginRight: "6px",
              },
              "&:hover .button-label": {
                display: "inline",
              },
            }}
            startIcon={<ChevronLeft size={3.5} stroke={"var(--foreground)"} />}
          >
            <span className="button-label capitalize">
              {props.label?.toLowerCase()}
            </span>
          </Button>
        </div>
      ) : (
        <IconButton
          onClick={props.onClick}
          color={"primary"}
          sx={{
            background: "#FCF7F1",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#FCF7F1",
              boxShadow: "none",
            },
            color: "var(--foreground)",
            padding: { xs: "3px 6px", md: "4px 8px" },
            borderRadius: "32px",
          }}
        >
          <ChevronLeft size={4} stroke={"var(--foreground)"} />
        </IconButton>
      )}
    </div>
  );
}
