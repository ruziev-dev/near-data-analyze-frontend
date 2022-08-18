type Props = {
  IconComponent: React.FC;
  description: string;
  value: string | number;
  colorClass?: string;
};
export const IconInfo = ({
  IconComponent,
  description,
  value,
  colorClass,
}: Props) => {
  return (
    <div className={`d-flex flex-row align-items-center ${colorClass}`}>
      <IconComponent />
      <div className="mt-1 d-flex flex-column justify-content-center align-items-center">
        <p className="font-weight-bold m-0"><b>{value}</b></p>
        <p className="font-weight-light m-0">{description}</p>
      </div>
    </div>
  );
};
