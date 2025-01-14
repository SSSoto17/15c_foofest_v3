import { getStages } from "@/lib/lineup";

export async function stageSchedule() {
  const stages = await getStages();
  const stageSchedule = Object.entries(stages).map(([name, days]) => ({
    name,
    days,
  }));

  return stageSchedule;
}

function Col(obj, data, deco, time) {
  this.title = obj;
  this.data = data;
  this.deco = deco;
  this.time = time;
}

//For stages schedule
export function Days(stage) {
  const hours = new Col("", stage.days.thu, "", true);
  const thu = new Col("Thursday", stage.days.thu, "08", false);
  const fri = new Col("Friday", stage.days.fri, "09", false);
  const sat = new Col("Saturday", stage.days.sat, "10", false);
  const cols = [hours, thu, fri, sat];
  return cols;
}

// For days schedule
function Day(dayKey, dayName, data) {
  const stages = data.map((stage) => {
    return { title: stage.name, deco: stage.name.slice(0, -4), data: stage.days[dayKey] };
  });

  const hours = new Col("", data[0].days.thu, "", true);
  const cols = [hours, ...stages];
  const dayObj = { name: dayName, cols };
  return dayObj;
}

export function Week(data) {
  const mon = new Day("mon", "Monday", data);
  const tue = new Day("tue", "Tuesday", data);
  const wed = new Day("wed", "Wednesday", data);
  const thu = new Day("thu", "Thursday", data);
  const fri = new Day("fri", "Friday", data);
  const sat = new Day("sat", "Saturday", data);
  const sun = new Day("sun", "Sunday", data);

  const week = [mon, tue, wed, thu, fri, sat, sun];
  return week;
}
