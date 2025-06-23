#!/bin/bash

# Get the absolute path to the script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/../" && pwd)"
FEATURE=$1

if [ -z "$FEATURE" ]; then
  echo "❌ Please provide a feature name. Example: ./generate-feature.sh project"
  exit 1
fi

FEATURE_CAMEL="${FEATURE,,}"
FEATURE_PASCAL="$(tr '[:lower:]' '[:upper:]' <<< ${FEATURE:0:1})${FEATURE:1}"

FEATURE_DIR="$ROOT_DIR/src/features/$FEATURE_CAMEL"

# Create all needed directories
mkdir -p $FEATURE_DIR/{api,components,converters,hooks,schemas,services,types}

# === api/<feature>-api.ts ===
cat <<EOF > $FEATURE_DIR/api/${FEATURE_CAMEL}-api.ts
// API calls for ${FEATURE_PASCAL}

export const get${FEATURE_PASCAL}Api = async () => {
  // TODO: Implement Firebase or external API fetch logic
};
EOF

# === services/<feature>-service.ts ===
cat <<EOF > $FEATURE_DIR/services/${FEATURE_CAMEL}-service.ts
import { get${FEATURE_PASCAL}Api } from "../api/${FEATURE_CAMEL}-api";

// ${FEATURE_PASCAL} business logic

export const get${FEATURE_PASCAL} = async () => {
  return await get${FEATURE_PASCAL}Api();
};
EOF

# === hooks/use<Feature>.ts ===
cat <<EOF > $FEATURE_DIR/hooks/use${FEATURE_PASCAL}.ts
import { useQuery } from "@tanstack/react-query";
import { get${FEATURE_PASCAL} } from "../services/${FEATURE_CAMEL}-service";

export const use${FEATURE_PASCAL} = () => {
  return useQuery(["${FEATURE_CAMEL}"], get${FEATURE_PASCAL});
};
EOF

# === converters/<feature>-converter.ts ===
cat <<EOF > $FEATURE_DIR/converters/${FEATURE_CAMEL}-converter.ts
import { ${FEATURE_PASCAL} } from "../types/${FEATURE_CAMEL}-types";
import { ${FEATURE_PASCAL}Document } from "../types/${FEATURE_CAMEL}-document";

export const convert${FEATURE_PASCAL}FromDocument = (
  doc: ${FEATURE_PASCAL}Document
): ${FEATURE_PASCAL} => {
  return {
    id: doc.id,
    // TODO: Add conversion logic
  };
};
EOF

# === types/<feature>-types.ts ===
cat <<EOF > $FEATURE_DIR/types/${FEATURE_CAMEL}-types.ts
export type ${FEATURE_PASCAL} = {
  id: string;
  // TODO: Add typed fields
};
EOF

# === types/<feature>-document.ts ===
cat <<EOF > $FEATURE_DIR/types/${FEATURE_CAMEL}-document.ts
export type ${FEATURE_PASCAL}Document = {
  id: string;
  // TODO: Add raw document structure (as stored in Firebase)
};
EOF

# === schemas/<feature>-schema.ts ===
cat <<EOF > $FEATURE_DIR/schemas/${FEATURE_CAMEL}-schema.ts
import { z } from "zod";

export const ${FEATURE_PASCAL}Schema = z.object({
  id: z.string(),
  // TODO: Add schema fields
});

export type ${FEATURE_PASCAL} = z.infer<typeof ${FEATURE_PASCAL}Schema>;
EOF

# === components/FeatureNameComponent.tsx ===
cat <<EOF > $FEATURE_DIR/components/${FEATURE_PASCAL}Card.tsx
type Props = {
  title: string;
};

export const ${FEATURE_PASCAL}Card = ({ title }: Props) => {
  return <div className="rounded border p-4 shadow">{title}</div>;
};
EOF

# === index.ts ===
cat <<EOF > $FEATURE_DIR/index.ts
export * from "./api/${FEATURE_CAMEL}-api";
export * from "./services/${FEATURE_CAMEL}-service";
export * from "./hooks/use${FEATURE_PASCAL}";
export * from "./converters/${FEATURE_CAMEL}-converter";
export * from "./schemas/${FEATURE_CAMEL}-schema";
export * from "./types/${FEATURE_CAMEL}-types";
export * from "./components/${FEATURE_PASCAL}Card";
EOF

echo "✅ Feature '$FEATURE_CAMEL' created in: $FEATURE_DIR"
