


import { ConnectMongo } from "@/app/util/database";
import Researche from "@/app/model/researches";

export const GET = async () => {
  try {
    await ConnectMongo();
    const allResearches = await Researche.find().sort({ createdAt: -1 });
    return new Response(JSON.stringify(allResearches), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch researches", { status: 500 });
  }
};
