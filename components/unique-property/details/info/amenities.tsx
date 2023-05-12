import { UniquePropertyPageProps } from '@types';

const Amenities: React.FC<UniquePropertyPageProps> = ({propertyDetails}) => {
  const { amenities } = propertyDetails;

  return (
    <div>
        <h1 className='font-bold text-xl mb-2 text-primary'> Available Amenities </h1>

        <div className="flex flex-wrap gap-2">
            { amenities.map((amenity) => amenity.amenities.map((amenity) => {
                return (
                    <p key={amenity.text} className='p-2 bg-secondary text-white rounded-md text-xs xls:text-sm'> {amenity.text} </p>
                )
            })) }
        </div>
    </div>
  )
}

export default Amenities