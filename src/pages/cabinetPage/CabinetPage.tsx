import {FC} from "react";
import {SegmentedControl} from "shared/ui/segmentedControl/SegmentedControl"; //todo поправить импорты

type CabinetPageProps = {}

const categories = [
    { label: 'Top Stories', value: 'top' },
    { label: 'Sports', value: 'sports' },
    { label: 'Entertainment', value: 'entertainment' },
];

export const CabinetPage: FC<CabinetPageProps> = () => {

    const handleCategoryChange = (selectedCategory) => {
        console.log('Selected category:', selectedCategory);
    };
  return (
    <div>
        <SegmentedControl options={categories} onSelect={handleCategoryChange} />
    </div>
  );
};


