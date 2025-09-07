import UpcomingEvents from "@/components/UpcomingEvents";

export const Page = async () => {
  return (
    <>
      <div className="m-5  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <UpcomingEvents />
      </div>
    </>
  );
};

export default Page;
