export default function ShowComponent(props) {
    if (!props.show) {
      return null;
    }
  
    return (props.children);
}