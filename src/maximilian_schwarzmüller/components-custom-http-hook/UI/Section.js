import classes from './Section.module.css';

const Section = ({ children }) => (
  <section className={classes.section}>{children}</section>
);

export default Section;
