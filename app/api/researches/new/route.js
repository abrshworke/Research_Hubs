

import { ConnectMongo } from "@/app/util/database";
import Researche from "@/app/model/researches";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const POST = async (request) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { title, category, researcher, abstract, image, date, fullDescription } = await request.json();

  try {
    await ConnectMongo();

    const newResearch = new Researche({
      title,
      category,
      researcher,
      researcherEmail: session.user.email, // ✅ attach user email
      abstract,
      image,
      date,
      fullDescription,
    });

    await newResearch.save();

    return new Response(JSON.stringify(newResearch), { status: 201 });
  } catch (error) {
    return new Response("Failed to create research", { status: 500 });
  }
};
