import { UniquePropertyPageProps } from '@types';

const PropertyInfo: React.FC<UniquePropertyPageProps> = ({propertyDetails}) => {
  const { furnishingStatus, completionStatus, purpose, referenceNumber, active, category, createdAt, updatedAt } = propertyDetails;
  const creDate = new Date(createdAt * 1000).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const updDate = new Date(updatedAt * 1000).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const infos = [
    { title: 'Type', value: category[1].nameSingular },
    { title: 'Active', value: active ? 'Yes' : 'No' },
    { title: 'Furnishing status', value: furnishingStatus === null ? 'Not specified' : furnishingStatus },
    { title: 'Completion status', value: completionStatus },
    { title: 'Purpose', value: purpose === 'for-rent' ? 'For rent' : 'For sale' },
    { title: 'Reference no.', value: referenceNumber },
    { title: 'Created at', value: creDate },
    { title: 'Last updated', value: updDate },
  ];

  return (
    <div>
        <h1 className='font-bold text-xl mb-2 text-primary'> Property Information </h1>

        <div className="flex justify-between flex-wrap gap-5">
          { infos.map((info) => {
            const {title, value} = info;

            return (
              <div key={title} className='flex justify-between w-full sm:w-[47%] border-b pb-2'>
                <p className='font-medium'> {title} </p>
                <p className='font-semibold capitalize'> {`${value}`} </p>
              </div>
            )
          }) }
        </div>
    </div>
  )
}

export default PropertyInfo