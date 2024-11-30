interface Props {
  events: any;
  event: any;
}
const Event = ({ events }: any) => {
  return (
    <ul>
      {events.map((event: any, index: number) => (
        <li key={index}>{event}</li>
      ))}
    </ul>
  );
};

export default Event;
