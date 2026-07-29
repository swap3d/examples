export default function Page() {
  return (
    <main>
      <h1>Submit a Swap3D conversion</h1>
      <form action="/api/convert" method="post" encType="multipart/form-data">
        <input name="file" type="file" required />
        <select name="targetFormat" defaultValue="glb">
          <option value="glb">GLB</option>
          <option value="gltf">glTF</option>
        </select>
        <button type="submit">Convert</button>
      </form>
    </main>
  );
}
