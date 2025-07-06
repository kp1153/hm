// src/app/utpati-bandar/[slug]/page.tsx

// Method 1: Using async/await (Recommended)
interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ params, searchParams }: PageProps) {
  // Await the params promise
  const { slug } = await params;
  
  // If you also use searchParams, await that too
  const resolvedSearchParams = searchParams ? await searchParams : {};

  // Your existing component logic here
  return (
    <div>
      <h1>Page for: {slug}</h1>
      {/* Your existing JSX */}
    </div>
  );
}

// OR

// Method 2: Using React.use() hook
import { use } from 'react';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default function Page({ params, searchParams }: PageProps) {
  // Use the React.use() hook to unwrap the promises
  const { slug } = use(params);
  const resolvedSearchParams = searchParams ? use(searchParams) : {};

  // Your existing component logic here
  return (
    <div>
      <h1>Page for: {slug}</h1>
      {/* Your existing JSX */}
    </div>
  );
}

// Example with more complete component structure:
export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  // Example of fetching data based on slug
  // const data = await fetchDataBySlug(slug);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {slug.replace(/-/g, ' ')}
      </h1>
      
      {/* Your existing content */}
      <div className="prose max-w-none">
        {/* Your component content here */}
      </div>
    </div>
  );
}

// If you need to generate static params (optional)
export async function generateStaticParams() {
  // Return array of possible slug values
  return [
    { slug: 'example-1' },
    { slug: 'example-2' },
    // ... more slugs
  ];
}

// If you need metadata generation (optional)
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  
  return {
    title: `${slug.replace(/-/g, ' ')} - Your Site Name`,
    description: `Page for ${slug}`,
  };
}