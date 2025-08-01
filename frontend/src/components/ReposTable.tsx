import { Box, Typography, Chip, IconButton, Tooltip } from "@mui/material";
import { Star, StarBorder, StarRate, ContentCopy, OpenInNew } from "@mui/icons-material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { GithubReposData, RepoInfoState } from "../types";
import { styles } from "../style";
import { isNil } from "ramda";
import { useState } from "react";

interface ReposTableProps {
  filteredRows: GithubReposData[];
  starredRepos: Set<number>;
  onStarToggle: (repoId: number) => void;
  onRowClick: (params: any) => void;
  isMobile: boolean;
}

export const ReposTable = ({
  filteredRows,
  starredRepos,
  onStarToggle,
  onRowClick,
  isMobile,
}: ReposTableProps) => {
  const [copyFeedback, setCopyFeedback] = useState<{ [key: string]: boolean }>({});

  const handleCopyToClipboard = async (url: string, repoId: number) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopyFeedback(prev => ({ ...prev, [repoId]: true }));
      setTimeout(() => {
        setCopyFeedback(prev => ({ ...prev, [repoId]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  const columns: GridColDef[] = [
    {
      field: "star",
      headerName: "Star",
      width: 80,
      align: "center",
      headerAlign: "center",
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            if (!isNil(params.row.id)) {
              onStarToggle(params.row.id);
            }
          }}
          color={starredRepos.has(params.row.id) ? "primary" : "default"}
        >
          {starredRepos.has(params.row.id) ? <StarRate /> : <StarBorder />}
        </IconButton>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 150,
      maxWidth: 250,
      filterable: false,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <Typography variant="body2" color="text.secondary" sx={styles.nameCell}>
            {params.value}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: "description",
      headerName: "Description",
      flex: 2,
      minWidth: 200,
      maxWidth: 400,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <Typography variant="body2" color="text.secondary" sx={styles.descriptionCell}>
            {params.value}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: "clone_url",
      headerName: "URL",
      flex: 1,
      minWidth: isMobile ? 200 : 150,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box sx={styles.urlCellContainer}>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              ...styles.urlCell, 
              ...styles.urlCellText
            }}
          >
            {/* Display URL without https:// for better readability */}
            {params.value.replace('https://', '')}
          </Typography>
          <Box sx={isMobile ? styles.urlButtonsContainerMobile : styles.urlButtonsContainer}>
            <Tooltip title={copyFeedback[params.row.id] ? "Copied!" : "Copy URL"}>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopyToClipboard(params.value, params.row.id);
                }}
                color={copyFeedback[params.row.id] ? "success" : "default"}
              >
                <ContentCopy fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Open in new tab">
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(params.value, '_blank');
                }}
                color="primary"
              >
                <OpenInNew fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      ),
    },
    {
      field: "language",
      headerName: "Language",
      width: isMobile ? 80 : 120, 
      filterable: false,
      renderCell: (params) => (
        <Chip size="small" label={params.value} variant="outlined" />
      ),
    },
    {
      field: "stargazers_count",
      headerName: "Stars",
      width: isMobile ? 80 : 120,
      filterable: false,
      renderCell: (params) => (
        <Chip
          size="small"
          icon={<Star fontSize="small" />}
          label={params.value}
          variant="outlined"
        />
      ),
    },
    {
      field: "owner.avatar_url",
      headerName: "Avatar",
      width: isMobile ? 60 : 100,
      sortable: false,
      filterable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <img
          src={params.row.owner.avatar_url}
          alt="avatar"
          style={{ width: 32, height: 32, borderRadius: "50%" }}
        />
      ),
    },
    {
      field: "open_issues_count",
      headerName: "Open Issues",
      width: isMobile ? 80 : 120,
      filterable: false,
    },
  ];

  return (
    <>
      <Typography variant="caption" color="text.secondary" sx={styles.caption}>
        {filteredRows.length} repos found
      </Typography>
      <Box sx={styles.dataGridContainer(isMobile)}>
        <DataGrid
          rows={filteredRows || []}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
            sorting: {
              sortModel: [{ field: "watchers_count", sort: "asc" }],
            },
          }}
          pageSizeOptions={[10, 25, 50]}
          disableRowSelectionOnClick={false}
          hideFooterSelectedRowCount={true}
          onRowClick={onRowClick}
          sx={styles.dataGrid}
        />
      </Box>
    </>
  );
}; 