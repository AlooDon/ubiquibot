import { Label } from "../interfaces/Label";
import { RecognizedProfits, RecognizedTimes } from "../interfaces/Recognized";

export type LowestLabel = {
  label: Label;
  minimum: {
    key: keyof Label[];
    value: number;
  };
};

export default function getLowestMatchFromLibrary(search: Label[], library: typeof RecognizedProfits | typeof RecognizedTimes): LowestLabel {
  const matches = search.map((label) => {
    const key = label.name as keyof typeof RecognizedProfits | keyof typeof RecognizedTimes;
    const value = library[key] as number;
    if (!value) {
      throw new Error(`Could not find value for ${key} in ${library}`);
    }
    return { label, key, value };
  });

  const minimum = matches.reduce((a, b) => (a.value < b.value ? a : b));

  return { label: minimum.label, minimum };
}

// export function getLowestLabel(search: Label[], library: typeof RecognizedProfits | typeof RecognizedTimes): LowestLabel {
//   const lowest: LowestLabel = {
//     label: search[0],
//     minimum: {
//       key: search[0].name,
//       value: library[search[0].name],
//     },
//   };

//   for (const label of search) {
//     if (library[label.name] < lowest.minimum.value) {
//       lowest.label = label;
//       lowest.minimum.key = label.name;
//       lowest.minimum.value = library[label.name];
//     }
//   }

//   return lowest;
// }

// export function getLowestLabel(search: Label[], library: typeof RecognizedProfits | typeof RecognizedTimes): LowestLabel {
//   const libraryValues = Object.values(library);
//   const minimumLibraryValue = Math.min(...libraryValues);
//   // get the key associated with the minimum library value
//   const flip = (data: typeof library) => Object.fromEntries(Object.entries(data).map(([key, value]) => [value, key]));

//   const flipped = flip(library) as { [key: string]: string };
//   const key = minimumLibraryValue.toString();
//   const minimumKey = flipped[key];
//   const lowestLabel = search.find((label) => label.name == minimumKey);

//   console.log({ lowestLabel });
//   if (!lowestLabel) {
//     throw new Error("could not find lowest value");
//   }
//   return {
//     label: lowestLabel as Label,
//     minimum: {
//       key: minimumKey,
//       value: minimumLibraryValue,
//     },
//   };
// }

// function sortLibraryInOrderOfValue(){

// }
