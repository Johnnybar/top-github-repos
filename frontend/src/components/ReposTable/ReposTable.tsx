import React, { useState } from "react";
import { Box, Typography, Chip, IconButton, Tooltip, Avatar } from "@mui/material";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { Visibility, Star, BugReport, Language, OpenInNew, ContentCopy } from "@mui/icons-material";
import { GithubReposData } from "../../types/repo";
import { styles } from "../../style";

interface ReposTableProps {
  repos: GithubReposData[];
  sortConfig: {
    field: "stars" | "watchers" | "issues" | "name" | "language";
    direction: "asc" | "desc";
  };
  onSort: (field: "stars" | "watchers" | "issues" | "name" | "language") => void;
  onRepoClick: (repo: GithubReposData) => void;
  onToggleStar?: (repo: GithubReposData) => void;
}

/**
 * ReposTable component displays repositories in a DataGrid format with sorting and pagination
 * @param repos - Array of repositories to display
 * @param sortConfig - Current sorting configuration
 * @param onSort - Callback function for sorting
 * @param onRepoClick - Callback function when a repository row is clicked
 * @returns JSX element containing the DataGrid table
 */
const ReposTable: React.FC<ReposTableProps> = ({
  repos,
  sortConfig,
  onSort,
  onRepoClick,
  onToggleStar,
}) => {
  const [isMobile] = useState(window.innerWidth < 768);

  const handleCopyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
    } catch (error) {
      console.error('Failed to copy URL:', error);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const columns: GridColDef[] = [
    {
      field: "star",
      headerName: "Star",
      width: 60,
      renderCell: (params) => (
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            onToggleStar?.(params.row);
          }}
          sx={{
            color: params.row.isStarred ? "warning.main" : "action.disabled",
            "&:hover": {
              color: params.row.isStarred ? "warning.dark" : "warning.main",
            },
          }}
        >
          <Star sx={{ fontSize: 18 }} />
        </IconButton>
      ),
    },
    {
      field: "avatar",
      headerName: "Owner",
      width: 80,
      renderCell: (params) => (
        <Avatar
          src={params.row.owner.avatar_url}
          alt={params.row.owner.html_url}
          sx={{ width: 32, height: 32 }}
        />
      ),
    },
    {
      field: "name",
      headerName: "Repository",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <Box sx={styles.nameCell}>
          <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
            {params.row.name}
          </Typography>
          {params.row.description && (
            <Typography variant="body2" color="text.secondary" sx={styles.descriptionCell}>
              {params.row.description}
            </Typography>
          )}
        </Box>
      ),
    },
    {
      field: "language",
      headerName: "Language",
      width: 120,
      renderCell: (params) => (
        params.row.language ? (
          <Chip
            label={params.row.language}
            size="small"
            variant="outlined"
            color="primary"
          />
        ) : (
          <Typography variant="body2" color="text.secondary">
            N/A
          </Typography>
        )
      ),
    },
    {
      field: "stargazers_count",
      headerName: "Stars",
      width: 100,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Star sx={{ fontSize: 16, color: "warning.main" }} />
          <Typography variant="body2">
            {formatNumber(params.row.stargazers_count)}
          </Typography>
        </Box>
      ),
    },
    {
      field: "watchers_count",
      headerName: "Watchers",
      width: 120,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Visibility sx={{ fontSize: 16, color: "info.main" }} />
          <Typography variant="body2">
            {formatNumber(params.row.watchers_count)}
          </Typography>
        </Box>
      ),
    },
    {
      field: "open_issues_count",
      headerName: "Issues",
      width: 100,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <BugReport sx={{ fontSize: 16, color: "error.main" }} />
          <Typography variant="body2">
            {formatNumber(params.row.open_issues_count)}
          </Typography>
        </Box>
      ),
    },
    {
      field: "clone_url",
      headerName: "URL",
      width: 300,
      renderCell: (params) => (
        <Box sx={styles.urlCellContainer}>
          <Typography variant="body2" sx={styles.urlCellText}>
            {params.row.clone_url}
          </Typography>
          <Box sx={isMobile ? styles.urlButtonsContainerMobile : styles.urlButtonsContainer}>
            <Tooltip title="Copy URL">
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopyUrl(params.row.clone_url);
                }}
              >
                <ContentCopy />
              </IconButton>
            </Tooltip>
            <Tooltip title="Open in new tab">
              <IconButton
                size="small"
                href={params.row.clone_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <OpenInNew />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={styles.dataGridContainer(isMobile)}>
      <DataGrid
        rows={repos}
        columns={columns}
        getRowId={(row) => row.id || row.name}
        onRowClick={(params: GridRowParams) => onRepoClick(params.row)}
        sx={styles.dataGrid}
        disableRowSelectionOnClick
        disableColumnMenu
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        disableVirtualization={isMobile}
        getRowClassName={() => "data-grid-row"}
        pageSizeOptions={[10, 25, 50, 100]}
        pagination
        paginationMode="client"
        rowHeight={72}
        columnBuffer={2}
        columnThreshold={2}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 25 },
          },
          sorting: {
            sortModel: [
              {
                field: sortConfig.field,
                sort: sortConfig.direction,
              },
            ],
          },
        }}
        onSortModelChange={(model) => {
          if (model.length > 0) {
            const field = model[0].field as "stars" | "watchers" | "issues" | "name" | "language";
            const direction = model[0].sort as "asc" | "desc";
            if (field && direction) {
              onSort(field);
            }
          }
        }}
      />
    </Box>
  );
};

export default ReposTable;
