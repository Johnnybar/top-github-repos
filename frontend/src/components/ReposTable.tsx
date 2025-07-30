import { Box, Typography, Chip, IconButton, Tooltip, Link } from "@mui/material";
import { Star, StarBorder, StarRate } from "@mui/icons-material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { GithubReposData, RepoInfoState } from "../types";
import { styles } from "../styles";
import { isNil } from "ramda";

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
      maxWidth: 200,
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
      width: 200,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <Typography variant="body2" color="text.secondary" sx={styles.descriptionCell}>
            {params.value}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: "url",
      headerName: "URL",
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Link href={params.value} target="_blank" sx={styles.urlCell}>
          {params.value}
        </Link>
      ),
    },
    {
      field: "language",
      headerName: "language",
      flex: 1,
      minWidth: 150,
      filterable: false,
      renderCell: (params) => (
        <Chip size="small" label={params.value} variant="outlined" />
      ),
    },
    {
      field: "stargazers_count",
      headerName: "Stars",
      width: 120,
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
      width: 100,
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
      flex: 1,
      minWidth: 150,
      filterable: false,
    },
  ];

  return (
    <>
      <Typography variant="caption" color="text.secondary">
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