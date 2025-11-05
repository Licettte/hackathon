import {FC, useState} from "react";
import {SegmentedControl} from "shared/ui/segmentedControl/SegmentedControl";
import {CreditCard} from "@/entities";
import {Flex} from "shared/ui/flex/Flex";
import {Button} from "shared/ui/buttons/button/Button";
import {ExplanationCarousel} from "shared/ui/сarousel/Carousel";
import {ObligationsTable} from "shared/ui/table/Table";
import {ProgressIndicator, useProgressController} from "shared/ui/ProgressIndicator/ProgressIndicator";
import {ReserveAccountMock} from "@/entities/reserveAccount/ReserveAccount";

type CabinetPageProps = {}

const opts: any[] = [
  { label: "ВТБ", value: "vtb" },
  { label: "СБЕРБАНК", value: "sber" },
  { label: "АЛЬФАБАНК", value: "alf" },
];

const items: any[] = [
  { id: "utilities", label: "ЖКХ…",  state: "pending" },
  { id: "mobile",    label: "Связь…", state: "pending" },
  { id: "loan",      label: "Кредит…", state: "pending" },
];

export const CabinetPage: FC<CabinetPageProps> = () => {
  const [val, setVal] = useState("vtb");

  const ctrl = useProgressController({ autoStep: 4, autoInterval: 600, cap: 95 });
  const steps = items.map((it, i) => ({
    ...it,
    state: ctrl.value >= (i + 1) * (100 / items.length) - 10 ? "done" : "pending",
  }));
  return (<Flex justify="space-between" align="center" gap={12}
      dir={ 'column'}
    >

      <SegmentedControl
        options={opts}
        value={val}
        onChange={(v) => setVal(v)}
      />
      <CreditCard number={9999} bankTitle={val} bankLogo={''}/>


      <ReserveAccountMock userId={1} planTotalRub={13450} />


                   <ProgressIndicator
          title="Анализ обязательных платежей"
          note="Подготавливаем план на месяц…"
          value={ctrl.value}
          running={ctrl.running}
          items={steps}
          footer={ctrl.value >= 100 ? <span>Готово! Показываю найденные платежи</span> : null}
      />
      <ExplanationCarousel      />

          <ObligationsTable
              data={[
                  { id: "1", name: "ЖКХ", amount: 5000, dueDay: 5 },
                  { id: "2", name: "Кредит", amount: 8000, dueDay: 15 },
              ]}
          />



      <Button color="black" label={'История операций'} size='sm'/>
    </Flex>
  );
};

