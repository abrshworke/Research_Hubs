
import ResearchList from "./ResearchList";

async function getResearches() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/researches`);
    
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to fetch researches');
    }
    
    return await res.json();
  } catch (error) {
    console.error('Fetch Error:', error);
    throw error; 
  }
}

export default async function ResearchPage() {
  try {
    const researches = await getResearches();
    
    return <ResearchList researches={researches} />;
    
  } catch (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-red-600">
          Error: {error.message}
        </div>
      </div>
    );
  }
}