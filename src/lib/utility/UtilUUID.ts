export class UtilUUID {
    /**
     * @function Generate() Generated UUID from Math.random()
     * @param blocks Number of string blocks to generate, default is `4`
     * @returns {string} Generated UUID
     */
    public static Generate(blocks = 4): string {
      const arr: number[] = Array(blocks).fill(0);
      return arr
        .map(() => Math.floor(Math.random() * 1000000))
        .map((v) => v.toString(16).toUpperCase())
        .join("-");
    }
  }