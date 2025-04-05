import Researche from "@/app/model/researches";
import { ConnectMongo } from "@/app/util/database";

export const GET = async (request, { params }) => {
    try {
      await ConnectMongo();
      
      const researches = await Researche.find({ user: params.userId });
      return new Response(JSON.stringify(researches), { status: 200 });
      
    } catch (error) {
      return new Response("Failed to fetch user researches", { status: 500 });
    }
  };