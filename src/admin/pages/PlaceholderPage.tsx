import { EmptyState } from "@/components/ui/EmptyState";

export function PlaceholderPage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <EmptyState
      title={title}
      description={description}
      actionLabel="Return to overview"
      actionHref="#/"
      className="min-h-[24rem] justify-center rounded-[2rem]"
    />
  );
}
