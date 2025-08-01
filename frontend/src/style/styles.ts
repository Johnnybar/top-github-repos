export const styles = {
  // App.tsx styles
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minWidth: "100%",
    padding: 0,
    margin: 0,
  },
  appBarTitle: {
    flexGrow: 1,
    fontWeight: 600,
  },

  // GithubReposDashboard.tsx styles
  tableContainer: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  loadingBox: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    bgcolor: "background.default",
    height: "100%",
  },
  mainBox: (isMobile: boolean) => ({
    flexGrow: 1,
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
  }),
  tableSection: (isMobile: boolean) => ({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    borderRight: isMobile ? "none" : "0.0625rem solid #e0e0e0",
  }),
  paper: {
    p: 2,
    bgcolor: "background.default",
    borderBottom: "0.0625rem solid #e0e0e0",
  },
  controlsBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 2,
  },

  // Search.tsx styles
  searchTextField: {
    mb: 1,
  },

  // LanguageFilter.tsx styles
  filtersBox: {
    display: "flex",
    gap: 2,
    mb: 1,
    alignItems: "flex-end",
  },
  formControl: {
    minWidth: "12.5rem",
  },
  clearButton: {
    height: "2.5rem",
  },
  languageChipsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: 0.5,
  },

  // ReposTable.tsx styles
  dataGridContainer: (isMobile: boolean) => ({
    flexGrow: 1,
    height: isMobile ? "calc(100vh - 200px)" : "auto",
    minHeight: isMobile ? "400px" : "auto"
  }),
  dataGrid: {
    border: "none",
    "& .MuiDataGrid-cell:focus-within": {
      outline: "none",
    },
    "& .MuiDataGrid-row:hover": {
      backgroundColor: "rgba(25, 118, 210, 0.04)",
      cursor: "pointer",
    },
    "& .selected-row": {
      backgroundColor: "rgba(25, 118, 210, 0.12) !important",
    },
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: "rgba(25, 118, 210, 0.08)",
      color: "text.primary",
      fontWeight: "bold",
    },
  },
  caption: {
    ml: 3,
  },

  // ReposTable.tsx cell styles
  nameCell: {
    whiteSpace: "pre-wrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
  },
  descriptionCell: {
    whiteSpace: "pre-wrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
  },
  urlCell: {
    textDecoration: "none",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
  },
  urlCellContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    width: '100%',
  },
  urlCellText: {
    flex: 1,
    fontSize: '0.75rem',
  },
  urlButtonsContainer: {
    display: 'flex',
    gap: 0.5,
  },
  urlButtonsContainerMobile: {
    display: 'flex',
    gap: 1, 
    minWidth: 'fit-content', // Ensure buttons don't get squeezed
  },

  // RepoDetailsDialog.tsx styles
  cardContent: {
    p: 0,
  },
  headerBox: {
    p: 2,
    pb: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subtitleBox: {
    px: 2,
    pb: 1,
  },
  linkBox: {
    px: 2,
    pb: 2,
  },
  chipsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  chipsRow: {
    display: "flex",
    gap: 2,
  },
  chip: {
    flex: 1,
  },
  dialogLink: {
    textDecoration: "none",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
    textAlign: "center",
    width: "100%",
    pb: 1,
  },

  // Error handling styles
  errorAlert: {
    maxWidth: 600,
    width: '100%',
  },
  errorMessageBox: {
    mt: 1,
  },
}; 