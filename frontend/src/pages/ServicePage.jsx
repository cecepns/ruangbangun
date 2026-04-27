/* eslint-disable react/prop-types */
import { ClipboardList, Handshake, Home, PenTool, ReceiptText, Wrench } from "lucide-react";
import desainIcon from "../assets/our-services/desain.jpg";
import desainKonstruksiIcon from "../assets/our-services/desain-konstruksi.jpg";
import kontraktorIcon from "../assets/our-services/kontraktor.jpg";
import { fallbackSteps } from "../constants/site";

export default function ServicePage({ data }) {
  const serviceIcons = [desainIcon, desainKonstruksiIcon, kontraktorIcon];
  const stepIcons = [Handshake, Home, PenTool, ReceiptText, Wrench, ClipboardList];
  const staticServices = [
    {
      title: "Desain Arsitektur & Interior",
      desc: "Perencanaan desain arsitektur dan interior diproyeksikan dalam gambar 2D & 3D.",
      icon: desainIcon,
    },
    {
      title: "Desain dan Konstruksi",
      desc: "Perencanaan desain dan konstruksi menyatu agar hasil sesuai visual dan gambar kerja.",
      icon: desainKonstruksiIcon,
    },
    {
      title: "Konstruksi",
      desc: "Pelaksanaan pengerjaan arsitektur dan interior sesuai gambar kerja dan RAB.",
      icon: kontraktorIcon,
    },
  ];

  const services = data.services.length ? data.services : staticServices;
  const steps = fallbackSteps.map((step) => {
    const [title, ...rest] = step.split(":");
    return { title, description: rest.join(":").trim() };
  });

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="section-title">Service</h1>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {services.map((item, idx) => (
          <div key={item.id || idx} className="card-ui" data-aos="fade-up">
            <img
              src={item.icon || serviceIcons[idx % serviceIcons.length]}
              alt={item.title}
              className="h-14 w-14 object-contain"
            />
            <h3 className="text-lg font-semibold text-primary">{item.title}</h3>
            <p className="mt-3 text-base leading-8">{item.description || item.desc}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-12 text-2xl font-bold text-primary">Langkah Kerja</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {steps.map((step, idx) => {
          const Icon = stepIcons[idx % stepIcons.length];
          return (
            <div key={step.title} className="card-ui flex flex-row items-start gap-4" data-aos="fade-up">
              <div className="rounded-xl bg-secondary/10 p-3 text-secondary">
                <Icon size={20} />
              </div>
              <div>
                <p className="font-semibold text-primary">{step.title}</p>
                <p className="mt-1 text-base leading-7">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
