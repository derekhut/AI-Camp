import { Section as SectionType } from "@/types/blocks/section";

export default function Branding({ section }: { section: SectionType }) {
  if (section.disabled) {
    return null;
  }

  return (
    <section id={section.name} className="py-16 mt-32">
      <div className="container flex flex-row items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-center text-xl font-bold lg:text-2xl mb-6 text-balance">
            <span className="bg-gradient-to-r from-primary via-primary to-primary bg-clip-text text-transparent">{section.title}</span>
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-8 mt-4">
            {section.items?.map((item, idx) => {
              if (item.image) {
                return (
                  <img
                    key={idx}
                    src={item.image.src}
                    alt={item.image.alt || item.title}
                    className="h-7 dark:invert"
                  />
                );
              }
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
