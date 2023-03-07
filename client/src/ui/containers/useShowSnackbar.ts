import { useStyles } from "ui/styles";
import { useSnackbar, VariantType } from "notistack";

export function useShowSnackbar() {
  const { enqueueSnackbar } = useSnackbar();
  const { classes } = useStyles();

  const showSnackbar = (variant: VariantType, message: string) => {
    enqueueSnackbar(message, {
      autoHideDuration: 3000,
      anchorOrigin: { horizontal: "right", vertical: "bottom" },
      variant: variant,
      className: `${classes.snackbar}`,
    });
  };

  return { showSnackbar };
}
