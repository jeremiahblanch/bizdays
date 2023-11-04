const isWeekend = (d: Date): boolean => {
  const dayOfWeek = d.getDay();
        
  return dayOfWeek === 0 /* Sunday */ || dayOfWeek === 6; /*Saturday */
}

export default isWeekend;