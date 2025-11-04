import {FC, useState} from "react";
import {SegmentedControl} from "shared/ui/segmentedControl/SegmentedControl";
import {CreditCard} from "@/entities";
import {Flex} from "shared/ui/flex/Flex";
import {Button} from "shared/ui/buttons/button/Button";

type CabinetPageProps = {}

const opts: any[] = [
  { label: "ВТБ", value: "vtb" },
  { label: "СБЕРБАНК", value: "sber" },
  { label: "АЛЬФАБАНК", value: "alf" },
];

export const CabinetPage: FC<CabinetPageProps> = () => {
  const [val, setVal] = useState("vtb");

  console.log(val, 'val')

  return (
    <Flex justify="space-between" align="center" gap={12}
      dir={ 'column'}
    >

      <SegmentedControl
        options={opts}
        value={val}
        onChange={(v) => setVal(v)}
      />
      <CreditCard number={9999} bankTitle={val} bankLogo={''}/>

      <Button color="black" label={'История операций'} size='sm'/>
    </Flex>
  );
};

