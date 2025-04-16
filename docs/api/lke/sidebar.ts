import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/lke/introducao",
    },
    {
      type: "category",
      label: "Ledger",
      link: {
        type: "doc",
        id: "api/lke/ledger",
      },
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "api/lke/list-ledgers",
          label: "Lista todos os ledgers",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/lke/create-ledger",
          label: "Criar um novo ledger",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/lke/get-ledger",
          label: "Obtém um ledger específico",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/lke/update-ledger",
          label: "Atualiza um ledger específico",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "api/lke/delete-ledger",
          label: "Exclui um ledger específico",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Chapter",
      link: {
        type: "doc",
        id: "api/lke/chapter",
      },
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "api/lke/list-chapters",
          label: "Lista todos os chapters",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/lke/create-chapter",
          label: "Cria um novo chapter",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/lke/get-chapter",
          label: "Obtém um chapter específico",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/lke/update-chapter",
          label: "Atualiza um chapter específico",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "api/lke/delete-chapter",
          label: "Exclui um chapter específico",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Asset",
      link: {
        type: "doc",
        id: "api/lke/asset",
      },
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "api/lke/create-asset",
          label: "Criar um novo asset",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Schemas",
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "api/lke/schemas/ledger",
          label: "Ledger",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/lke/schemas/chapter",
          label: "Chapter",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/lke/schemas/asset",
          label: "Asset",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/lke/schemas/metadata",
          label: "Metadata",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/lke/schemas/datetime-iso-8601-rfc-3339",
          label: "DateTime (ISO 8601 / RFC 3339)",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/lke/schemas/error",
          label: "Error",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/lke/schemas/errors",
          label: "Errors",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/lke/schemas/version",
          label: "Version",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/lke/schemas/entityid",
          label: "EntityID",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/lke/schemas/ledgercreateresquest",
          label: "LedgerCreateResquest",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/lke/schemas/ledgerupdaterequest",
          label: "LedgerUpdateRequest",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/lke/schemas/chaptercreaterequest",
          label: "ChapterCreateRequest",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/lke/schemas/chapterupdaterequest",
          label: "ChapterUpdateRequest",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/lke/schemas/assetcreaterequest",
          label: "AssetCreateRequest",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/lke/schemas/errorsresponse",
          label: "ErrorsResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/lke/schemas/ledgerresponse",
          label: "LedgerResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/lke/schemas/chapterresponse",
          label: "ChapterResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/lke/schemas/assetresponse",
          label: "AssetResponse",
          className: "schema",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
