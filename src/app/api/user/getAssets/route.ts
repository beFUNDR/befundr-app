import { NextRequest, NextResponse } from "next/server";
import admin from "@/lib/firebase/firebaseAdmin";

export async function GET(req: NextRequest) {
  try {
    const wallet = req.nextUrl.searchParams.get("wallet");
    if (!wallet) {
      return NextResponse.json(
        { error: "Wallet is required" },
        { status: 400 }
      );
    }
    const apiKey = process.env.HELIUS_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Helius API key missing" },
        { status: 500 }
      );
    }
    const heliusUrl = `https://mainnet.helius-rpc.com/?api-key=${apiKey}`;
    const body = {
      jsonrpc: "2.0",
      id: "1",
      method: "getAssetsByOwner",
      params: {
        ownerAddress:
          /*"BvMiFRYKT1Q3ZZJQGvxgfybG9Tza3k8kWqp3H4gzUojz"*/ wallet /*"5FALSVLRjuRZHSmQVdT2RUZC6KadCuDmxY7gaQFWFBxf"*/, //TODO: remove after testing
        page: 1,
        limit: 50,
        sortBy: { sortBy: "created", sortDirection: "asc" },
        options: {
          showUnverifiedCollections: false,
          showCollectionMetadata: false,
          showGrandTotal: false,
          showFungible: false,
          showNativeBalance: false,
          showInscription: false,
          showZeroBalance: false,
        },
      },
    };
    const heliusRes = await fetch(heliusUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await heliusRes.json();

    // Récupérer les collections autorisées depuis Firestore
    const allowedSnap = await admin.firestore().collection("collections").get();
    const allowedCollections = allowedSnap.docs.map((doc) => doc.id);
    console.log(allowedCollections);

    const filteredItems = data.result.items.filter((item: any) => {
      return allowedCollections.includes(item.grouping?.[0]?.group_value);
    });

    console.log("filteredItems", filteredItems);

    return NextResponse.json(
      { ...data, result: { ...data.result, items: filteredItems } },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
