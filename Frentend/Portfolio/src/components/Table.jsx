export default function Table() {
    const projects = [
      {
        title: "Project Alpha",
        stack: "React, Node.js",
        deployed: "✅",
        update: "2024-02-22",
        visit: "https://alpha.example.com",
      },
      {
        title: "Project Beta",
        stack: "Vue, Firebase",
        deployed: "❌",
        update: "2024-02-20",
        visit: "https://beta.example.com",
      },
    ];
  
    return (
      <div className="container mx-auto p-6 border-2">
        <table className="min-w-full border border-gray-200 shadow-lg rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Stack</th>
              <th className="p-3 text-center">Deployed</th>
              <th className="p-3 text-center">Update</th>
              <th className="p-3 text-center">Visit</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr
                key={index}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-3">{project.title}</td>
                <td className="p-3">{project.stack}</td>
                <td className="p-3 text-center">{project.deployed}</td>
                <td className="p-3 text-center">{project.update}</td>
                <td className="p-3 text-center">
                  <a
                    href={project.visit}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Visit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  