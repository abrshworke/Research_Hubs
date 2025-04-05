



import { ConnectMongo } from '@/app/util/database';
import Research from '@/app/model/researches';
import mongoose from 'mongoose';

export async function GET(req, { params }) {
  try {
    await ConnectMongo();

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return new Response(JSON.stringify({ error: 'Invalid research ID' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const research = await Research.findById(params.id);
    if (!research) {
      return new Response(JSON.stringify({ error: 'Research not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(research), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('GET error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch research' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}







// 🔁 PUT /api/researches/:id
export async function PUT(req, { params }) {
  try {
    await ConnectMongo();
    const data = await req.json();

    const updated = await Research.findByIdAndUpdate(params.id, data, {
      new: true,
    });

    if (!updated) {
      return new Response(JSON.stringify({ error: 'Research not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(updated), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('PUT error:', error);
    return new Response(JSON.stringify({ error: 'Failed to update research' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}



// ❌ DELETE /api/researches/:id
export async function DELETE(req, { params }) {
  try {
    await ConnectMongo();

    const deleted = await Research.findByIdAndDelete(params.id);

    if (!deleted) {
      return new Response(JSON.stringify({ error: 'Research not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ message: 'Research deleted successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('DELETE error:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete research' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
