import { ref, type Ref } from "vue";

export const fetchData = () => {
  const data: Ref<any[] | null> = ref(null);
  const error: Ref<String | unknown> = ref(null);
  const reload = async (url: string): Promise<void> => {
    try {
      const getData = await fetch(url, {
        method: "GET",
        mode: "cors",

        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      setTimeout(async () => {
        if (getData.ok) {
          const jsonData: JSON[] = await getData.json();
          data.value = jsonData;
        } else if (!getData.ok) {
          throw new Error("an error occured" + getData.statusText);
        }
      }, 2000);
    } catch (err) {
      error.value = err;
    }
  };
  return { data, error, reload };
};
