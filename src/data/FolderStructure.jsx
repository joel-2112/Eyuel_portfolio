
import ResumePDF from "../assets/files/Eyuel_cv.pdf";
import EyuelCV from "../assets/files/Eyuel_cv.pdf";
import RecommPDF from "../assets/files/Eyuel_cv.pdf";
import TempoPDF from "../assets/files/Eyuel_cv.pdf";
import ApplicationPDF from "../assets/files/Eyuel_cv.pdf";
import ReactPDF from "../assets/files/Eyuel_cv.pdf";
import PythonPDF from "../assets/files/Eyuel_cv.pdf";
import CyberPDF from "../assets/files/Eyuel_cv.pdf";
import DartPDF from "../assets/files/Eyuel_cv.pdf";
import NodePDF from "../assets/files/Eyuel_cv.pdf";
import SecurityPDF from "../assets/files/Eyuel_cv.pdf";
import HobbiesTXT from "../assets/files/Eyuel_cv.pdf";
import ExampleTXT from "../assets/files/Eyuel_cv.pdf";
import me from "../assets/me.jpg";
export const folderStructure = [
    { name: "Quick access", type: "folder", children: [] },
    { name: "OneDrive", type: "folder", children: [] },
    {
      name: "This PC",
      type: "folder",
      children: [
        {
          name: "Desktop",
          type: "folder",
          children: [
            {
              name: "Projects",
              type: "folder",
              children: [
                {
                  name: "Web Apps",
                  type: "folder",
                  children: [
                    {
                      name: "EthioExplore",
                      type: "folder",
                      children: [
                        {
                          name: "Doc",
                          type: "file",
                          path: HobbiesTXT, // Example file
                        },
                        {
                          name: "Live View",
                          type: "file",
                          path: ExampleTXT, // Example file
                        },
                        {
                          name: "Github",
                          type: "file",
                          path: ExampleTXT, // Example file
                        },
                      ],
                    },
                  ],
                },
                {
                  name: "Mobile Apps",
                  type: "folder",
                  children: [],
                },
              ],
            },
            { name: "Contacts", type: "folder", children: [] },
            { name: "hobbies.txt", type: "file", path: HobbiesTXT },
          ],
        },
        {
          name: "Documents",
          type: "folder",
          children: [
            {
              name: "Important",
              type: "folder",
              children: [
                { name: "Resume.pdf", type: "file", path: ResumePDF },
                { name: "Eyuel_cv.pdf", type: "file", path: EyuelCV },
                { name: "Recomm.pdf", type: "file", path: RecommPDF },
                { name: "Tempo.pdf", type: "file", path: TempoPDF },
                { name: "Application.pdf", type: "file", path: ApplicationPDF },
              ],
            },
            {
              name: "Certificates",
              type: "folder",
              children: [
                { name: "React.pdf", type: "file", path: ReactPDF },
                { name: "Python.pdf", type: "file", path: PythonPDF },
                { name: "cyber.pdf", type: "file", path: CyberPDF },
                { name: "Dart.pdf", type: "file", path: DartPDF },
                { name: "Node.pdf", type: "file", path: NodePDF },
              ],
            },
            {
              name: "References",
              type: "folder",
              children: [
                { name: "React.pdf", type: "file", path: ReactPDF },
                { name: "Python.pdf", type: "file", path: PythonPDF },
                { name: "security.pdf", type: "file", path: SecurityPDF },
                { name: "Dart.pdf", type: "file", path: DartPDF },
                { name: "Node.pdf", type: "file", path: NodePDF },
              ],
            },
          ],
        },
        {
          name: "Pictures",
          type: "folder",
          children: [
            { name: "Vacation", type: "file", path: me },
            { name: "Family", type: "folder", children: [] },
          ],
        },
        { name: "Music", type: "folder", children: [] },
        { name: "Videos", type: "folder", children: [] },
        { name: "example.txt", type: "file", path: ExampleTXT },
      ],
    },
    { name: "Network", type: "folder", children: [] },
  ];