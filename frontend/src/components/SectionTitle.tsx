
interface Title {
  title: string
}

const SectionTitle = ({ title }: Title) => {
  return (
    <div>
      <div className="h-32 md:h-48 bg-[#2A2A2A]">
        <div className="flex items-center text-white text-3xl md:text-4xl font-semibold w-full h-full max-md:px-5 w-6/6 md:w-4/6 mx-auto">
          <h1 className="uppercase">{title}</h1>
        </div>
      </div>
    </div>
  )
}

export default SectionTitle